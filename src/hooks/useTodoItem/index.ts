import TodoItem from "@domains/TodoItem";
import { localStorageKey } from "@utils/constants";
import { useEffect, useState } from "react";

const useTodoItems = () => {
    const [cards, setCards] = useState<TodoItem[]>([]);

    const toDoItems: TodoItem[] = [];
    const inProgressItems: TodoItem[] = [];
    const doneItems: TodoItem[] = [];

    const addCard = (card: TodoItem) => {
        setCards([...cards, card]);
    };

    const removeCard = (cardId: string) => {
        console.log(cardId);
        const cardWithCurrentId = cards.find(
            (card: TodoItem) => card.getId() === cardId,
        );

        console.log("cardWithCurrentId", cardWithCurrentId);    

        const idArray = cards.map((card:TodoItem) => console.log(card.getId()));

        console.log(idArray);

        if (!cardWithCurrentId) {
            console.log("NOTHING:", cardWithCurrentId  )
            return;
        }

        const newCardsList = cards.filter( card => card.getId() !== cardId);

        console.log("NEW LIST: ", newCardsList);

        setCards(newCardsList);
    };

    const saveToLocalStorage = (cards: TodoItem[]) => {
        const cardsToString = cards.map((card) => card.toString());

        console.log("CARDS FOR LS: ", cardsToString);

        localStorage.setItem(localStorageKey, JSON.stringify(cardsToString));
    };

    useEffect(() => {
        saveToLocalStorage(cards);
    }, [cards]);

    useEffect(() => {
        const storageItems: string | null =
            localStorage.getItem(localStorageKey);

        console.log("ITEMS FROM STORAGE:", storageItems);

        if (!storageItems) {
            return;
        }

        const stringStorageItems: string[] = JSON.parse(storageItems);

        console.log("PARSED ITEMS:", stringStorageItems);

        const parsedItems = stringStorageItems.map((item) =>
            TodoItem.fromRaw(item),
        );

        console.log(parsedItems);

        setCards(parsedItems);
    }, []);

    return {
        cards,
        setCards,
        addCard,
        toDoItems,
        inProgressItems,
        doneItems,
        removeCard,
    };
};

export default useTodoItems;
