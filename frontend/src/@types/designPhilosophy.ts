export interface DesignPhilosophyPrinciple {
    id: number;
    design_philosophy_id: number;
    title: string;
    description?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface DesignPhilosophy {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    image: string;
    image_url: string;
    design_philosophy_principles?: DesignPhilosophyPrinciple[];
    created_at?: string;
    updated_at?: string;
}
