import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

// Not Error Handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  // return error if route not found
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error)
};

// Error Handler
// Define and export the error handler function
export const handleError: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  // Set the status code to 500 if the current status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for a specific error type
  if (err.name === 'CastError' && (err as any).kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Set the response status code
  res.status(statusCode);

  // Send the JSON response
  res.json({
    status: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
  });
};