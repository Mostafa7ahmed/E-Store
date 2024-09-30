export interface Signup {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface SendMail {
  email: string;
}

export interface VerifyCode {
  resetCode: string;
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}
