import bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string): Promise<string> {
    const saltRounds = 10; // Adjust as necessary for security
    return await bcrypt.hash(password, saltRounds);
  }

  static async compare(storedPassword: string, passwordToCompare: string): Promise<boolean> {
    // storedPassword is the hashed password from the database
    // passwordToCompare is the plain text password provided by the user during signin
    // console.log(storedPassword, 'compare..',passwordToCompare);
    return await bcrypt.compare(passwordToCompare, storedPassword);
  }
}
