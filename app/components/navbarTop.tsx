import DetailWallet from "./button/detailWallet"
import Profile from "./profile"

export default function NavbarTopSection() {
  return (
    <div className="flex justify-end w-screen p-2">
      <Profile/>
      <DetailWallet/>
    </div>
  )
}