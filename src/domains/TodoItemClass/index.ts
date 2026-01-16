export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";

class TodoItem {
    private id: string;
    private name: string;
    private description: string;
    private status: TodoStatus;

    private constructor(id: string, name: string, description: string, status: TodoStatus) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public static fromData(
        id: string,
        name: string,
        description: string,
        status: TodoStatus
    ): TodoItem {
        return new TodoItem(id, name, description, status);
    }

    public static fromRaw(raw: string): TodoItem {
        const parsedData = JSON.parse(raw);

        if (
            !(
                "id" in parsedData &&
                "name" in parsedData &&
                "status" in parsedData &&
                "description" in parsedData
            )
        ) {
            throw new Error("Not enough data to create new item");
        }

        return new TodoItem(
            parsedData.id,
            parsedData.name,
            parsedData.description,
            parsedData.status
        );
    }

    public toString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status,
        });
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getStatus(): TodoStatus {
        return this.status;
    }

    public setStatus(status: TodoStatus): void {
        this.status = status;
    }
}

export default TodoItem;
