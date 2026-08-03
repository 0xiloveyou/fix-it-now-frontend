import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const AdminGroupLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {

  const user = await getMe()
  
  return (
    <div>
      <Navbar user={user}/>
      {children}
      <Footer/>
    </div>
  )
}

export default AdminGroupLayout