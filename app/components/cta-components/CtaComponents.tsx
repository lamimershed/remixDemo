import { Link } from "@remix-run/react"


const CtaComponents = () => {
  return (
    <div className="w-[400px] rounded-xl p-[30px] flex flex-col justify-between bg-white">
        <h3 className="text-[24px] text-black font-semibold">
          Lorem Ipsum is simply 
        </h3>
        <p className="text-[14px] text-black font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <Link className="p-[10px_14px] bg-slate-600 text-white rounded-xl" to="/mykarehealth.com">click me!</Link>
    </div>
  )
}

export default CtaComponents