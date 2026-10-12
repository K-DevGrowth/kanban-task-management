import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const useAuth = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/boards");
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};

export default useAuth;
