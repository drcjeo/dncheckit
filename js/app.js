:root {
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-link-color: #2481cc;
    --tg-theme-button-color: #2481cc;
    --tg-theme-button-text-color: #ffffff;
    --success-color: #28a745;
    --error-color: #dc3545;
    --warning-color: #ffc107;
    --gradient-start: #2193b0;
    --gradient-end: #6dd5ed;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 16px;
    font-size: 16px;
    line-height: 1.5;
    min-height: 100vh;
}

.page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: var(--tg-theme-bg-color);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title-section {
    text-align: center;
    margin-bottom: 30px;
}

.main-title {
    font-size: 2.5em;
    background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 15px 0;
    padding: 0;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.caution-banner {
    background: linear-gradient(45deg, #ff9966, #ff5e62);
    color: white;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9em;
    display: inline-block;
    animation: pulse 2s infinite;
    box-shadow: 0 4px 15px rgba(255, 94, 98, 0.2);
}

.vizzy-container {
    text-align: center;
    margin: 30px 0;
    position: relative;
}

.vizzy-character {
    display: inline-block;
    position: relative;
}

.vizzy-image {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border: 3px solid var(--tg-theme-button-color);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.vizzy-speech-bubble {
    position: absolute;
    background: var(--tg-theme-bg-color);
    border: 2px solid var(--tg-theme-button-color);
    border-radius: 20px;
    padding: 12px 20px;
    max-width: 250px;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.vizzy-speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid var(--tg-theme-button-color);
}

.search-box {
    display: flex;
    gap: 12px;
    margin: 30px 0;
}

.search-box input {
    flex: 1;
    padding: 15px;
    border: 2px solid var(--tg-theme-hint-color);
    border-radius: 12px;
    font-size: 16px;
    background: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    transition: all 0.3s;
}

.search-box input:focus {
    outline: none;
    border-color: var(--tg-theme-button-color);
    box-shadow: 0 0 0 3px rgba(36,129,204,0.1);
}

.search-box button {
    padding: 15px 30px;
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-box button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(36,129,204,0.3);
}

.search-box button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.platform-box {
    background: var(--tg-theme-bg-color);
    border: 1px solid var(--tg-theme-hint-color);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: all 0.3s;
}

.platform-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.platform-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.platform-badge {
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
}

.status-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.status-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--tg-theme-text-color);
}

.result {
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s;
}

.result.show {
    opacity: 1;
    transform: translateY(0);
}

.result.available {
    background: rgba(40, 167, 69, 0.1);
    color: var(--success-color);
}

.result.unavailable {
    background: rgba(220, 53, 69, 0.1);
    color: var(--error-color);
}

.result.error {
    background: rgba(255, 193, 7, 0.1);
    color: var(--warning-color);
}

.premium-tag {
    display: inline-block;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
}

.discount-code {
    display: inline-block;
    background: linear-gradient(45deg, #00C853, #64DD17);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
}

.spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

.hidden {
    display: none !important;
}

@media (max-width: 480px) {
    .container {
        padding: 20px;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .search-box button {
        width: 100%;
    }
    
    .vizzy-speech-bubble {
        max-width: 200px;
        font-size: 14px;
    }
}
