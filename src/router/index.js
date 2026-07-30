import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            description: 'Open HomeLab — a code-first, GitOps homelab. Proxmox and Talos provisioned as code, delivered by Argo CD, with open source identity, secrets, storage, and LGTM observability.'
        }
    },
    {
        path: '/stack',
        name: 'Stack',
        component: () => import('../views/Stack.vue'),
        meta: {
            title: 'The Stack',
            description: 'Every open source tool in Open HomeLab — Proxmox, Talos, Argo CD, Keycloak, OpenBao, Longhorn, Harbor, and the full Grafana LGTM observability stack.'
        }
    },
    {
        path: '/docs',
        name: 'Docs',
        component: () => import('../views/Docs.vue'),
        meta: {
            title: 'Documentation',
            description: 'How to bring up an Open HomeLab cluster — Proxmox provisioning, Talos bootstrap, and GitOps delivery with Argo CD.'
        }
    },
    {
        // Catch-all placeholder so unknown routes still land somewhere sensible.
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Update page title and meta description based on route
router.afterEach((to) => {
    document.title = to.meta.title
        ? `${to.meta.title} | Open HomeLab`
        : 'Open HomeLab — A Code-First GitOps Homelab'

    if (to.meta.description) {
        let tag = document.querySelector('meta[name="description"]')
        if (!tag) {
            tag = document.createElement('meta')
            tag.setAttribute('name', 'description')
            document.head.appendChild(tag)
        }
        tag.setAttribute('content', to.meta.description)
    }
})

export default router
