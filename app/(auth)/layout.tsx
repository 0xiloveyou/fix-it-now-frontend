import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

const AuthGroupLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default AuthGroupLayout