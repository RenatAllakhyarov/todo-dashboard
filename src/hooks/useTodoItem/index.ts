import TodoItem from "@domains/TodoItem";
import { ItemStatus, localStorageKey } from "@utils/constants";
import { useEffect, useMemo, useState } from "react";

interface IToDoColumns {
    toDoItems: TodoItem[];
    inProgressItems: TodoItem[];
    doneItems: TodoItem[];
}

const useTodoItems = (isCashEnabled: boolean = true) => {
    const [cards, setCards] = useState<TodoItem[]>([]);

    const toDoItems: TodoItem[] = [];
    const inProgressItems: TodoItem[] = [];
    const doneItems: TodoItem[] = [];

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

    const getCardById = (cardId: string) => {
        return cards.find((card: TodoItem) => card.getId() === cardId);
    }

    const findCard = (
        cardName?: string,
        cardDescription?: string,
    ): TodoItem => {
        const foundedCard = cards.find(
            (item: TodoItem) =>
                cardName?.toLowerCase().includes(item.getName().toLowerCase()) ||
                cardDescription?.toLowerCase().includes(item.getDescription().toLowerCase())
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
        taskFilterToColumns,
    };
};

export default useTodoItems;
