import TodoItem, { TodoStatus } from "@domains/TodoItem";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ItemStatus, localStorageKey } from "@utils/constants";

interface IToDoColumns {
    toDoItems: TodoItem[];
    inProgressItems: TodoItem[];
    doneItems: TodoItem[];
}

export interface ITodoHookReturn {
    cards: TodoItem[];
    taskFilterToColumns: IToDoColumns;
    addCard: (card: TodoItem) => void;
    removeCard: (cardId: string) => void;
    setCards: Dispatch<SetStateAction<TodoItem[]>>;
    getCardById: (cardId: string) => TodoItem | undefined;
    findCard: (cardName?: string, cardDescription?: string) => TodoItem;
    handleCardEdit: (
        cardId: string,
        data?: { name?: string; description?: string; status?: TodoStatus },
    ) => void;
}

const useTodoItems = (isCashEnabled: boolean = true): ITodoHookReturn => {
    const [cards, setCards] = useState<TodoItem[]>([]);

    const addCard = (card: TodoItem) => {
        setCards([...cards, card]);
    };

    const removeCard = (cardId: string) => {
        const cardWithCurrentId = cards.find(
            (card: TodoItem) => card.getId() === cardId,
        );

        if (!cardWithCurrentId) {
            return;
        }

        const newCardsList = cards.filter((card) => card.getId() !== cardId);

        setCards(newCardsList);
    };

    const getCardById = (cardId: string): TodoItem | undefined => {
        return cards.find((card: TodoItem) => card.getId() === cardId);
    };

    const findCard = (
        cardName?: string,
        cardDescription?: string,
    ): TodoItem => {
        const foundedCard = cards.find(
            (item: TodoItem) =>
                cardName
                    ?.toLowerCase()
                    .includes(item.getName().toLowerCase()) ||
                cardDescription
                    ?.toLowerCase()
                    .includes(item.getDescription().toLowerCase()),
        );

        if (!foundedCard) {
            throw new Error("Don't have card with this params");
        }

        return foundedCard;
    };

    const saveToLocalStorage = (cards: TodoItem[]) => {
        const cardsToString = cards.map((card) => card.toString());

        localStorage.setItem(localStorageKey, JSON.stringify(cardsToString));
    };

    const taskFilterToColumns: IToDoColumns = useMemo(() => {
        const toDoItems: TodoItem[] = [];
        const inProgressItems: TodoItem[] = [];
        const doneItems: TodoItem[] = [];

        cards.forEach((item: TodoItem) => {
            const itemStatus: string = item.getStatus();

            if (itemStatus === ItemStatus.TODO) {
                toDoItems.push(item);

                return;
            }

            if (itemStatus === ItemStatus.IN_PROGRESS) {
                inProgressItems.push(item);

                return;
            }

            if (itemStatus === ItemStatus.DONE) {
                doneItems.push(item);

                return;
            }
        });

        return {
            toDoItems,
            inProgressItems,
            doneItems,
        };
    }, [cards]);

    const handleCardEdit = (
        cardId: string,
        data?: { name?: string; description?: string; status?: TodoStatus },
    ) => {
        const cardWithCurrentId = cards.find(
            (card: TodoItem) => card.getId() === cardId,
        );

        if (!cardWithCurrentId) {
            return;
        }

        data?.name && cardWithCurrentId.setName(data.name);

        data?.description && cardWithCurrentId.setDescription(data.description);

        data?.status && cardWithCurrentId.setStatus(data.status);

        setCards([...cards]);
    };

    const getItemsFromLocalStorage = (isCashEnabled: boolean) => {
        if (!isCashEnabled) {
            return;
        }

        const storageItems: string | null =
            localStorage.getItem(localStorageKey);

        if (!storageItems) {
            return;
        }

        const stringStorageItems: string[] = JSON.parse(storageItems);

        const parsedItems = stringStorageItems.map((item) =>
            TodoItem.fromRaw(item),
        );

        setCards(parsedItems);
    };

    useEffect(() => {
        if (!cards.length) {
            return;
        }

        if (!isCashEnabled) {
            return;
        }

        saveToLocalStorage(cards);
    }, [cards]);

    useEffect(() => {
        getItemsFromLocalStorage(isCashEnabled);
    }, []);

    return {
        cards,
        addCard,
        setCards,
        findCard,
        removeCard,
        getCardById,
        handleCardEdit,
        taskFilterToColumns,
    };
};

export default useTodoItems;
