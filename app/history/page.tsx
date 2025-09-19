import { ClockIcon } from "@heroicons/react/24/outline";
import getUserSessionHistory from "../actions/history_actions";
import { HistoryConvoItem } from "../ui/convo-history";
import LinkAsButton from "../ui/links";

export default async function History() {
  const allQueries = await getUserSessionHistory();
  const error = allQueries.error;
  const history = error ? undefined : allQueries.data;

  return (
    <div className="w-full min-h-screen bg-background text-foreground px-4 py-8 flex flex-col items-center">
      {/* Title */}
      <div className="w-full max-w-3xl mb-6 flex items-center gap-2">
        <ClockIcon className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Recipe History</h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl">
        {history ? (
          history.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="bg-primary-foreground/70 backdrop-blur-sm border border-border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <HistoryConvoItem {...item} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )
        ) : (
          <ErrorState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="w-full text-center px-4 py-8 bg-muted/30 border border-muted rounded-lg">
      <p className="text-base text-muted-foreground mb-4">
        You haven’t generated any recipes yet.
      </p>
      <LinkAsButton
        href="/browse/upload"
        className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Create Your First Recipe 💡
      </LinkAsButton>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="w-full text-center px-4 py-8 bg-red-500/10 border border-red-500/30 rounded-lg">
      <p className="text-base text-red-300 mb-4">
        Failed to load your recipe history. Try again later.
      </p>
      <LinkAsButton
        href="/browse/upload"
        className="inline-block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
      >
        Start Cooking 🔥
      </LinkAsButton>
    </div>
  );
}
