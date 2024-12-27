import { Request, Response } from 'express';
import { bookServices } from './book.service';

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;

    const result = await bookServices.createBookIntoDB(book);
    res.status(200).send({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Validation failed',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

const getBooks = async (req: Request, res: Response) => {
  try {
    const result = await bookServices.getAllBooks();
    res.status(200).send({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Something went wrong',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await bookServices.getSingleBook(id);
    res.status(200).send({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Something went wrong',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const body = req.body;
    const result = await bookServices.updateBook(id, body);
    res.status(200).send({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Something went wrong',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    await bookServices.deleteBook(id);
    res.status(200).send({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Something went wrong',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

export const booksController = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
