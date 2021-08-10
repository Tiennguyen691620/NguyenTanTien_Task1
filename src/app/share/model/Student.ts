export  interface Student {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  passwordGroup: {
    password: any;
    confirmPassword: any;
  };
  isEdit: boolean;
}
