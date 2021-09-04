import { Fragment, useEffect } from "react";
import { dbMonsters } from "../../firebaseSetup";
import { useAppDispatch } from "../../app/hooks";
import { fetchMonsters } from "../../features/monsters/monstersSlice";
import { IMonster } from "../../types";

export const DatabaseListener: React.FC = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dbMonsters.on("value", (snapshot) => {
            const monsters = [] as IMonster[];
            snapshot.forEach((childSnapshot) => {
                const monster = {
                    ...childSnapshot.val(),
                    id: childSnapshot.key
                }
                monsters.push(monster);
            });
            dispatch(fetchMonsters(monsters));
        })
    }, [dispatch]);

    return <Fragment>{children}</Fragment>;
};