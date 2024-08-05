import { trpc } from "@/trpc/server";

import UserInfo from "@/app/(player)/user/UserInfo";

export default async function User({}) {
  const data = await trpc.me.getMyProfile.query();
  const { display_name, followers, id, images, type } = data;
  const imageUrl = (() => {
    const image =
      images.find(({ width }) => width && width >= 250) ?? images[0];
    return image?.url ?? "";
  })();

  return (
    <main>
      <UserInfo
        display_name={display_name ?? id}
        followers={followers}
        imageUrl={imageUrl}
        type={type}
      />
    </main>
  );
}