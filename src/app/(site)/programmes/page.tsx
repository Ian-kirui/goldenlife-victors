import HeroSub from "@/components/SharedComponent/HeroSub";
import ProgrammeList from "@/components/Programme/ProgrammeList";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Programme List | GoldenLife Victors",
};

const Page = () => {
    return (
        <>
            <HeroSub
                title="Programmes"
            />
            <ProgrammeList />
            <Volunteer />
        </>
    )
}

export default Page;