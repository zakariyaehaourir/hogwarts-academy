export abstract class Repository<T> {

    protected items: T[] = [];


    /**
     * 
     * @param item Entity to persist
     */
    public  save(item: T): T{
        this.items.push(item);
        return item;
    }
    public  getAll(): T[]{
        return [... this.items];
    }
}