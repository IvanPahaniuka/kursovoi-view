import ICategory from "./category";

export default interface IFilter {
    search?: string;
    categories?: Array<ICategory>;
}