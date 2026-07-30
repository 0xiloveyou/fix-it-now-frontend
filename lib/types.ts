
type IUser = {
    success: boolean,
    message: string,
    data: {
        user : {
            id: string,
            name: string,
            email: string,
            status: string,
            role: string,
            phone?: string,
            profileImage?: string,
            createdAt: string,
            updatedAt: string,
        }
    }
}

export type NavbarProps = {
    user: IUser
}