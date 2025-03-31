const API = {
    Freename: {
        checkDomain: async (domain) => {
            try {
                const [name, tld] = domain.toLowerCase().split('.');
                
                // Check TLD support
                const tldResponse = await fetch(`${CONFIG.FREENAME.API_URL}${CONFIG.FREENAME.ENDPOINTS.GET_TLDS}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Api-Version': CONFIG.FREENAME.API_VERSION
                    }
                });

                if (!tldResponse.ok) {
                    throw new Error('Unable to verify TLD');
                }

                // Check domain availability
                const response = await fetch(`${CONFIG.FREENAME.API_URL}${CONFIG.FREENAME.ENDPOINTS.CHECK_DOMAIN}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Api-Version': CONFIG.FREENAME.API_VERSION
                    },
                    body: JSON.stringify({ name, tld })
                });

                if (!response.ok) {
                    throw new Error('Domain check failed');
                }

                const data = await response.json();

                // Check resolution
                const resolveResponse = await fetch(`${CONFIG.FREENAME.API_URL}${CONFIG.FREENAME.ENDPOINTS.RESOLVE}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Api-Version': CONFIG.FREENAME.API_VERSION
                    },
                    body: JSON.stringify({ domain: `${name}.${tld}` })
                });

                const resolveData = await resolveResponse.json();
                const isRegistered = resolveData && resolveData.records && resolveData.records.length > 0;

                return {
                    available: !isRegistered,
                    name: name,
                    tld: tld,
                    platform: 'Freename',
                    price: CONFIG.FREENAME.SUPPORTED_TLDS[tld]?.price,
                    registrable: !isRegistered,
                    resolution: resolveData,
                    discount: CONFIG.FREENAME.SUPPORTED_TLDS[tld]?.discount
                };
            } catch (error) {
                console.error('Freename API error:', error);
                throw new Error('Unable to check domain availability');
            }
        }
    },

    Handshake: {
        checkDomain: async (domain) => {
            try {
                const response = await fetch(`${CONFIG.HANDSHAKE.CORS_PROXY}${encodeURIComponent(`${CONFIG.HANDSHAKE.RESOLVER_API}${domain}`)}`, {
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error('Handshake check failed');
                }

                const data = await response.json();
                const isAvailable = data.code === 'ENODATA' || data.code === 'NXDOMAIN';

                return {
                    available: isAvailable,
                    platform: 'Handshake',
                    name: domain,
                    price: isAvailable ? CONFIG.HANDSHAKE.DEFAULT_PRICE : null,
                    registrable: isAvailable,
                    records: !isAvailable ? data.Answer || [] : null
                };
            } catch (error) {
                console.error('Handshake check error:', error);
                throw new Error('Unable to check Handshake domain');
            }
        }
    }
};
