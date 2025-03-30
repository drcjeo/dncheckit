// Required dependencies
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Constants
const CREATOR_USERNAME = '@John';
const DEFAULT_PRICES = {
    miniapp: 42,
    crypto: 88,
    rwa: 150,
    hns: 65
};

// Initialize bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Web app URL
const webAppUrl = process.env.WEBAPP_URL || 'https://dncheckit.miniapp';

// Bot commands configuration
const commands = [
    { command: 'start', description: 'Start DNcheckit' },
    { command: 'check', description: 'Check domain availability' },
    { command: 'help', description: 'Show help information' },
    { command: 'pricing', description: 'Show TLD pricing' }
];

// Set bot commands
async function setupBot() {
    try {
        await bot.setMyCommands(commands);
        console.log('Bot commands set successfully');
    } catch (error) {
        console.error('Error setting bot commands:', error);
    }
}

setupBot();

// Command handlers
const commandHandlers = {
    async start(chatId, msg) {
        const keyboard = {
            reply_markup: {
                keyboard: [[{
                    text: '🔍 Check Domain',
                    web_app: { url: webAppUrl }
                }]],
                resize_keyboard: true
            }
        };

        const welcomeMessage = `Welcome to DNcheckit! 🌐

I help you check domain availability across:
• Freename.io - For .miniapp and .rwa domains
• Unstoppable Domains - For .crypto domains
• Handshake - For .hns domains

🔥 Special: Use code MAX45 for .miniapp domains!

Press the button below or type /check to start.`;

        await bot.sendMessage(chatId, welcomeMessage, keyboard);
    },

    async check(chatId) {
        const inlineKeyboard = {
            reply_markup: {
                inline_keyboard: [[{
                    text: '🔍 Open Domain Checker',
                    web_app: { url: webAppUrl }
                }]]
            }
        };

        await bot.sendMessage(
            chatId, 
            'Click below to check domain availability:',
            inlineKeyboard
        );
    },

    async help(chatId) {
        const helpMessage = `DNcheckit Help Guide 📚

Commands:
/start - Start DNcheckit
/check - Check domain availability
/pricing - Show TLD pricing
/help - Show this help

Features:
• Multi-platform domain checking
• .miniapp TLD support with MAX45 discount
• Real-time availability checks

Status: Demo Mode (API Integration Pending)
Created by: ${CREATOR_USERNAME}`;

        await bot.sendMessage(chatId, helpMessage);
    },

    async pricing(chatId) {
        const pricingMessage = `Domain Pricing Guide 💰

.miniapp domains: $${DEFAULT_PRICES.miniapp} 
  → Use code MAX45 for 45% off!
.crypto domains: $${DEFAULT_PRICES.crypto}
.rwa domains: $${DEFAULT_PRICES.rwa}
.hns domains: $${DEFAULT_PRICES.hns}

Note: Demo prices shown. Actual prices may vary.`;

        await bot.sendMessage(chatId, pricingMessage);
    }
};

// Command listeners
Object.keys(commandHandlers).forEach(command => {
    bot.onText(new RegExp(`\\/${command}`), async (msg) => {
        try {
            await commandHandlers[command](msg.chat.id, msg);
        } catch (error) {
            console.error(`Error handling /${command}:`, error);
            bot.sendMessage(
                msg.chat.id,
                '⚠️ Sorry, something went wrong. Please try again later.'
            );
        }
    });
});

// Web app data handler
bot.on('web_app_data', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const data = JSON.parse(msg.web_app_data.data);
        
        if (data.domain) {
            await bot.sendMessage(
                chatId,
                `🔍 Checking availability for: ${data.domain}\n⌛ Please wait...`
            );

            // Demo response (will be replaced with actual API integration)
            setTimeout(async () => {
                const isAvailable = Math.random() > 0.3;
                const tld = data.domain.split('.').pop();
                const price = DEFAULT_PRICES[tld] || 42;

                const resultMessage = isAvailable ?
                    `✅ ${data.domain} is available!\n💰 Price: $${price}` +
                    (tld === 'miniapp' ? '\n🏷️ Use code MAX45 for 45% off!' : '') :
                    `❌ Sorry, ${data.domain} is not available.`;

                await bot.sendMessage(chatId, resultMessage);
            }, 1500);
        }
    } catch (error) {
        console.error('Error handling web_app_data:', error);
        bot.sendMessage(
            msg.chat.id,
            '⚠️ Error processing domain check. Please try again.'
        );
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

// Express server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`DNcheckit server running on port ${PORT}`);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', mode: 'Demo - API Pending' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    bot.stopPolling();
    process.exit(0);
});
