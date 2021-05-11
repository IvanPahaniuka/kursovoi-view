import ICategory from "./category";
import IRate from "./rate";

export default interface IStuff {
    id: number;
    name: string;
    description: string;
    categories: Array<ICategory>;
    rates: Array<IRate>;
    cost: number;
    image: string;
}