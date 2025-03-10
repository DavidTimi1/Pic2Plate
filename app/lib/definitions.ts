

export type User = {
    username: string;
    session_id: string;
    email: string;
}

export type Query = {
    id: string;
    user: User;
    image_url: string;
    details: string;
    budget: string;
    response: QueryResponse;
}


type QueryResponse = {
    text: string;
    steps: Object;
}