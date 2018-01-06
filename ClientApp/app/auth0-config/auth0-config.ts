export const AUTH0_CONFIG = {
    clientId: 'OzaV1UwlCTaFjSZg9HtgWtanOWHj3ocD',
    domain: 'ritwickdey.auth0.com',
    options: {
        auth: {
            redirectUrl: `${window.location.origin}/vehicles`,
            responseType: 'token',
            params: {
                audience: 'https://saleIt.com',
                scope: 'openid email profile'
            }
        },
        theme: {
            primaryColor: '#3899D8',
            logo: '/img/icon.png'
        },
        additionalSignUpFields: [
            {
                name: 'name',
                placeholder: 'Full Name',
                icon: '/img/details-icon.svg',
                validator: function (name) {
                    return {
                        valid: new RegExp(/^[a-z,.'-]+\s[a-z, .'-]+$/i).test(name),
                        hint: "Enter a valid Full Name"
                    };
                }
            }
        ],
        autoclose: true,
        autofocus: true,
        languageDictionary: {
            title: 'Log me in'
        }
    }
}