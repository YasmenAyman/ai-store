import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Github, Mail } from "lucide-react";
import React from "react";

const Login = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
  };

  return (
    <Layout>
      <div className="container py-20 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-xl shadow-lg border">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold">{t.auth.loginTitle}</h1>
            <p className="text-muted-foreground">{t.auth.loginSub}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t.auth.email}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  {t.auth.password}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t.auth.login}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t.auth.orContinue}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="w-full">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {t.auth.noAccount}{" "}
            </span>
            <Link to="/register" className="text-primary font-medium hover:underline">
              {t.auth.register}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
