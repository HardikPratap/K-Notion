export interface User { id: string; name: string; email: string; avatar?: string; }
export interface Brain { _id: string; title: string; description?: string; isPublic?: boolean; tags?: string[]; links?: any[]; notes?: any[]; }
export interface Link { _id: string; title?: string; url: string; previewImage?: string; description?: string; tags?: string[]; }
export interface Note { _id: string; title?: string; content: string; tags?: string[]; }