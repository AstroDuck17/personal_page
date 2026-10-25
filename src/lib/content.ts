import { getCollection } from 'astro:content';
export const reviewMode = import.meta.env.REVIEW_DRAFTS === 'true';
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const projects = async () => (await getCollection('projects', ({ data }) => reviewMode || (!data.draft && data.status !== 'draft'))).sort((a,b) => a.data.order - b.data.order);
export const writing = async () => (await getCollection('writing', ({ data }) => reviewMode || (!data.draft && data.status !== 'draft'))).sort((a,b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
export const projectUrl = (id: string) => href(`projects/${id}/`);
export const writingUrl = (id: string) => href(`writing/${id}/`);
export const topicUrl = (id: string) => href(`topics/${id}/`);
export const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
