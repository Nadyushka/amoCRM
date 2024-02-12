export interface ContentType {
    id: number
    request_id: string
    _links: {
        self: {
            href: string
        }
    }
}


export type ContentTypes = 'leads' | 'contacts' | 'companies'


