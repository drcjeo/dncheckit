const CONFIG = {
    FREENAME: {
        API_URL: 'https://api.freename.io',
        API_VERSION: '3.0.0',
        ENDPOINTS: {
            CHECK_DOMAIN: '/v1/domain/check',
            GET_TLDS: '/v1/domain/tlds',
            GET_PRICE: '/v1/domain/price',
            RESOLVE: '/v1/domain/resolve'
        },
        SUPPORTED_TLDS: {
            'rwa': { price: '50 USDT' },
            'miniapp': { price: '45 USDT', discount: 'MAX45' },
            'pix': { price: '75 USDT' },
            'phygital': { price: '60 USDT' },
            'wenmoon': { price: '50 USDT' },
            'genx': { price: '50 USDT' },
            '420': { price: '50 USDT' }
        }
    },
    HANDSHAKE: {
        RESOLVER_API: 'https://ns.hns.is/',
        CORS_PROXY: 'https://api.allorigins.win/raw?url=',
        DEFAULT_PRICE: '15 HNS'
    }
};
