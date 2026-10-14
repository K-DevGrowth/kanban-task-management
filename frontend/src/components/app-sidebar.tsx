import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GalleryVerticalEndIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useBoards from "@/hooks/useBoards";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { cn } from "cn";
import FormBoard from "./FormBoard";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { boards, isPending, isError, isCreating, createBoard } = useBoards();

  if (isPending) {
    return "loading...";
  }

  if (isError) {
    return "error...";
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEndIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Kanban</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>ALL BOARDS (*)</SidebarMenuButton>

              <SidebarMenuSub>
                {boards?.data.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton
                      isActive={item.isActive}
                      render={<Link to={`/boards/${item.id}`} />}
                    >
                      {item.title}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Dialog>
                <DialogTrigger className={cn("w-full text-left")}>
                  Create New Board
                </DialogTrigger>

                <DialogContent>
                  <FormBoard
                    submitLabel={"Create Board"}
                    isPending={isCreating}
                    onSubmit={({ title }) => createBoard({ title })}
                  />
                </DialogContent>
              </Dialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
