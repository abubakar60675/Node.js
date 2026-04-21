export const schemaValidator = (schema) => (req, res, next) => {
  try {
    const input = {
      ...req.body,
      ...(req.params || {}),
      ...(req.query || {}),
    };

    const result = schema.safeParse(input);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => {
        const field =
          issue.path.length > 0 ? issue.path[issue.path.length - 1] : "Field";

        // Check if the field was actually missing from the input
        const fieldValue = issue.path.reduce((obj, key) => obj?.[key], input);
        const isMissing = fieldValue === undefined || fieldValue === null;
        const fieldLabel =
          String(field).charAt(0).toUpperCase() + String(field).slice(1);
        const message = isMissing
          ? `"${fieldLabel}" is required`
          : `${fieldLabel}: ${issue.message}`;
        return message;
      });
      return res.status(400).json({
        success: false,
        message: formattedErrors.join(", "),
        data: null,
      });
    }

    req.validatedData = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
