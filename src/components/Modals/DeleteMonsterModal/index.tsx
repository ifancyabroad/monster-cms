import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteMonsterModal } from '../../../features/modals/modalsSlice';
import { deleteMonster } from '../../../features/monsters/monstersSlice';
import { ConfirmationModal } from '../..';

export const DeleteMonsterModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.modals.deleteMonsterModal.open);
    const monster = useAppSelector((state) => state.modals.deleteMonsterModal.monster);
    const isLoading = useAppSelector((state) => state.monsters.status === "loading");

    if (!monster) {
        return null;
    }

    const handleClose = () => {
        dispatch(closeDeleteMonsterModal())
    }

    const handleConfirm = async () => {
        try {
            await dispatch(deleteMonster(monster)).unwrap();
            dispatch(closeDeleteMonsterModal());
        } catch (error) {
            // TODO: Show error popup
        }
    }

    return (
        <ConfirmationModal
            open={open}
            title="Are you sure?"
            content={`This action will permanently delete ${monster.name} from the database.`}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            disabled={isLoading}
        />
    );
}
