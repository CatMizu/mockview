"use client"
import TitleCard from "@/components/cards/title-card";
import DummyData from "@/helper/dummy-data";
import dummyData, { TeamMember } from "@/helper/dummy-data";
import { useAppDispatch } from "@/lib/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";


const TopSideButtons: React.FC = () => {
    const dispatch = useAppDispatch();

    const addNewTeamMember = () => {
        dispatch(showNotification({ message: "Add New Member Clicked", status: 1 }));
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={addNewTeamMember}>Invite New</button>
        </div>
    );
}

const Team: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>(DummyData.TEAM_MEMBERS_LIST);

    const getRoleComponent = (role: string) => {
        if (role === "Admin") return <div className="badge badge-secondary">{role}</div>;
        if (role === "Manager") return <div className="badge">{role}</div>;
        if (role === "Owner") return <div className="badge badge-primary">{role}</div>;
        if (role === "Support") return <div className="badge badge-accent">{role}</div>;
        else return <div className="badge badge-ghost">{role}</div>;
    }

    return (
        <>
            </>
    )
}

export default Team