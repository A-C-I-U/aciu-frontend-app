export default function ContactInfo() {
    return (
       <div
            className="
                flex flex-col gap-12 bg-aciu-light-yellow rounded-[0.625rem] py-5.5 px-3.5 md:py-13 md:px-12"
            >
            {/* National Secretariat */}
            <div className="flex flex-col gap-4">
                <p className="text-aciu-border-grey lg:text-xl">
                    National Secretariat
                </p>
                <p className="font-semibold lg:text-lg">
                ACIU Headquarters, Enachioken Road, Abiriba Abia State, Nigeria
                </p>
            </div>

            {/* Telephone */}
            <div className="flex flex-col gap-4">
                <p className="text-aciu-border-grey lg:text-xl">
                    Telephone
                </p>
                <p className="font-semibold lg:text-lg">
                    +234 701 000 0000
                </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-4">
                <p className="text-aciu-border-grey lg:text-lg">
                Email
                </p>
                <p className="font-semibold lg:text-xl">
                info@aciuabiriba.org
                </p>
            </div>

            {/* Office Hours */}
            <div className="flex flex-col gap-4">
                <p className="text-aciu-border-grey lg:text-lg">
                Office Hours
                </p>
                <p className="font-semibold lg:text-lg">
                info@aciuabiriba.org
                </p>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-4">
                <p className="font-coolvetica text-gray-900 text-xl lg:text-2xl">
                Our Social Media
                </p>
                <p className="font-coolvetica text-aciu-green-normal leading-8">
                Facebook <span className="text-gray-900">|</span> Twitter <span className="text-gray-900">|</span> Whatsapp
                </p>
            </div>
            </div>
    )
}