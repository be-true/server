const { StaticService } = require('@be-true/server');

class DocsService extends StaticService {

    static service() {
        return {
            ...StaticService.service(),
            name: 'docs',
            config: {
                root: __dirname + '/static',
                prefix: '/docs'
            }
        }
    }

}

module.exports = {
    DocsService
}