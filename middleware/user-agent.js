export default function(context) {
  // Add the userAgent property in the context (available in `data` and `fetch`)
  context.userAgent = context.isServer
    ? context.req.headers['user-agent']
    : navigator.userAgent;
  // global.console.log(context.userAgent);
}
