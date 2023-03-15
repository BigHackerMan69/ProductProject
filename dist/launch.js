import { routes } from './A/routes.js';
import http from 'http'; // NOT PRODUCTION
const port = 3000;
/* New, can be migrated to https but need CA setup */
http
    .createServer(routes)
    .listen(port, () => {
    console.debug('Launching the server at port ' + port);
});
//# sourceMappingURL=launch.js.map