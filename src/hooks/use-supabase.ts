import { createClient, User, type Provider } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TData } from "../../interfaces/app";
const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface ReturnData {
  error: string;
}
export const useSupabaseClient = () => {
  const router = useRouter();
  const [data, setData] = useState<TData[]>([]);
  const [takeError, setTakeError] = useState<string | undefined>(undefined);

  const session: Promise<Session | null> = client.auth
    .getSession()
    .then(({ data }) => data.session);
  const user: Promise<User | undefined> = session.then((user) => user?.user);

  const email = user.then((email) => email?.email);

  useEffect(() => {
    async function checkSession() {
      const s = await session;
      const path = router.pathname;
      if (s && path !== "/" && path !== "/404") {
        router.push("/");
        return;
      }
      router.push(path);
    }
    checkSession();
  }, []);

  useEffect(() => {
    const readData = async () => {
      const { data } = await client
        .from("keeps")
        .select("*")
        .match({ email: await email })
        .order("created_at", { ascending: false });
      setData(data!);
    };

    const interval = setInterval(readData, 1000);
    return () => clearInterval(interval);
  }, [email]);

  return {
    signUp: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<ReturnData> => {
      const { error } = await client.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });

      setTakeError(error?.message);
      return {
        error: takeError!,
      };
    },
    signInWithOAuth: async (
      provider: Provider
    ): Promise<Pick<ReturnData, "error">> => {
      const { error } = await client.auth.signInWithOAuth({ provider });
      setTakeError(error?.message);
      return {
        error: takeError!,
      };
    },
    signInWithMagicLink: async (email: string): Promise<ReturnData> => {
      const { error } = await client.auth.signInWithOtp({ email });
      setTakeError(error?.message);
      return {
        error: takeError!,
      };
    },
    signOut: async () => {
      await client.auth.signOut();
      router.reload();
    },

    insertData: async ({
      title,
      url,
    }: {
      title: string;
      url: string;
    }): Promise<ReturnData> => {
      const { error } = await client
        .from("keeps")
        .insert({ title, url, email: await email });
      setTakeError(error?.message);

      return {
        error: takeError!,
      };
    },
    getData: <T = TData>() => data as T[],
    deleteData: async (id: string): Promise<ReturnData> => {
      const { error } = await client.from("keeps").delete().match({ id });
      setTakeError(error?.message);
      return {
        error: takeError!,
      };
    },
    getUserSession: async () => (await user) as User | undefined,
  };
};
