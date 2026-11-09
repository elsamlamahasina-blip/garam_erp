import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';

createInertiaApp({
  title: (title) => `${title ? `${title} - ` : ''}MADURA ERP/EIS Pamekasan`,
  resolve: (name) => {
    const pages = import.meta.glob<any>('./Pages/**/*.vue', { eager: true });
    const page = pages[`./Pages/${name}.vue`];
    if (!page) {
      throw new Error(`Page component "./Pages/${name}.vue" not found.`);
    }
    return page.default || page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});

