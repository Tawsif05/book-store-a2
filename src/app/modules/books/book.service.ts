import { TBook } from "./book.interface";
import { Book } from "./book.model";

const createBookIntoDB = async (book: TBook) => {
    const currentTime = new Date();
    book.createdAt = currentTime;
    book.updatedAt = currentTime;
    const result = await Book.create(book);
    return result;
}

const getAllBooks = async () => {
    const result = Book.find();
    return result;
}

const getSingleBook = async (id: string) => {
    const result = await Book.findById(id);
    return result;
}

const updateBook = async(id: string, data: Partial<TBook>) => {
    data.updatedAt = new Date();
    const result = await Book.findByIdAndUpdate(id, data, {new: true});
    
    
    return result;
}

const deleteBook = async (id: string) => {
    const result = Book.findByIdAndDelete(id);
    return result;
}


export const bookServices = {
    createBookIntoDB,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
}