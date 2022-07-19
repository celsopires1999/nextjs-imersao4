import { GetServerSideProps, NextPage } from "next";
import { withAuth } from "../hof/withAuth";

export type Pagina1PageProps = {
  msg: string;
};

const Pagina1Page: NextPage<Pagina1PageProps> = (props) => {
  console.log(props);
  return <>{props.msg}</>;
};

export default Pagina1Page;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   console.log(`at ${new Date()} ctx.req.url:`, ctx.req.url);
//   return {
//     props: {
//       msg: "Hello",
//     },
//   };
// };

export const getServerSideProps = withAuth(async (ctx) => {
  console.log(`at ${new Date()}`, ctx.req.url);
  return {
    props: {
      msg: `Hello`,
    },
  };
});
