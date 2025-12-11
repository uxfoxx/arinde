export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          excerpt: string | null
          category: string
          featured_image: string | null
          gallery_images: string[] | null
          client_name: string | null
          project_date: string | null
          location: string | null
          area_size: string | null
          featured: boolean
          order_number: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          excerpt?: string | null
          category: string
          featured_image?: string | null
          gallery_images?: string[] | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          area_size?: string | null
          featured?: boolean
          order_number?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          excerpt?: string | null
          category?: string
          featured_image?: string | null
          gallery_images?: string[] | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          area_size?: string | null
          featured?: boolean
          order_number?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          icon: string | null
          order_number: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          icon?: string | null
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          icon?: string | null
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          company: string | null
          content: string
          rating: number
          photo_url: string | null
          order_number: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          company?: string | null
          content: string
          rating?: number
          photo_url?: string | null
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          company?: string | null
          content?: string
          rating?: number
          photo_url?: string | null
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_name: string
          publish_date: string
          category: string | null
          tags: string[] | null
          is_published: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_name?: string
          publish_date?: string
          category?: string | null
          tags?: string[] | null
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_name?: string
          publish_date?: string
          category?: string | null
          tags?: string[] | null
          is_published?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: string
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          site_title: string
          logo_url: string
          hero_title: string
          hero_subtitle: string
          hero_category: string
          hero_images: string[]
          about_title: string
          about_text: string | null
          company_address: string
          company_phone: string
          company_email: string
          social_youtube: string
          social_instagram: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_title?: string
          logo_url?: string
          hero_title?: string
          hero_subtitle?: string
          hero_category?: string
          hero_images?: string[]
          about_title?: string
          about_text?: string | null
          company_address?: string
          company_phone?: string
          company_email?: string
          social_youtube?: string
          social_instagram?: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_title?: string
          logo_url?: string
          hero_title?: string
          hero_subtitle?: string
          hero_category?: string
          hero_images?: string[]
          about_title?: string
          about_text?: string | null
          company_address?: string
          company_phone?: string
          company_email?: string
          social_youtube?: string
          social_instagram?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          photo_url: string | null
          email: string | null
          social_links: Record<string, unknown>
          order_number: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          photo_url?: string | null
          email?: string | null
          social_links?: Record<string, unknown>
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          photo_url?: string | null
          email?: string | null
          social_links?: Record<string, unknown>
          order_number?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          type: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          type: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          type?: string
          created_at?: string
        }
      }
    }
  }
}
