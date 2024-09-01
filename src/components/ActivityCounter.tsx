import { IconBxCommentDetail, IconDislike, IconLike } from './Icons';

export type ActivityCounterProps = {
  like: number | null;
  dislake: number | null;
  comment: number | null;
};

export default function ActivityCounter(props: ActivityCounterProps) {
  return (
    <div className="flex items-center space-x-4 pt-4">
      <IconWithCaption>
        <IconBxCommentDetail />
        <p>{props.comment}</p>
      </IconWithCaption>

      <IconWithCaption>
        <IconLike />
        <p>{props.like}</p>
      </IconWithCaption>

      <IconWithCaption>
        <IconDislike />
        <p>{props.dislake}</p>
      </IconWithCaption>
    </div>
  );
}

function IconWithCaption({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row items-center space-x-1">{children}</div>;
}
