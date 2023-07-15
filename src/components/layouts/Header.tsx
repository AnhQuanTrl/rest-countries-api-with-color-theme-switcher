import MoonIcon from "@/components/icons/MoonIcon";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import Center from "./Center";

function Header() {
  const { toggleTheme } = useTheme();

  return (
    <header className="bg-card text-card-foreground shadow">
      <Center className="flex items-center py-6 2xl:py-5">
        <h1 className="mr-auto">
          <Button asChild className="text-sm font-extrabold ring-offset-card 2xl:text-2xl">
            <Link to="/">Where in the world?</Link>
          </Button>
        </h1>
        <Button
          type="button"
          className="gap-2 ring-offset-card 2xl:h-10 2xl:px-5 2xl:text-base"
          size="sm"
          onClick={toggleTheme}
        >
          <MoonIcon />
          Dark mode
        </Button>
      </Center>
    </header>
  );
}

export default Header;
