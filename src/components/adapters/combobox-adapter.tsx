"use client"

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface ComboboxAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  disabled?: boolean;
  isSubmitting?: boolean;
  placeholder?: string;
  items: any[];
  itemKeyExtractor: (item: any) => string | number;
  itemDisplayExtractor: (item: any) => string;
  itemValueExtractor: (item: any) => string | number;
  onSearchTermChange?: (searchTerm: string) => void;
  isLoadingItems?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  searchPlaceholder?: string;
}

export function ComboboxAdapter<TFormValues extends FieldValues>({
  field,
  disabled,
  isSubmitting,
  placeholder = "Select an item...",
  items = [],
  itemKeyExtractor,
  itemDisplayExtractor,
  itemValueExtractor,
  onSearchTermChange,
  isLoadingItems,
  emptyMessage = "No item found.",
  loadingMessage = "Loading...",
  searchPlaceholder = "Search items...",
}: ComboboxAdapterProps<TFormValues>) {
  const [open, setOpen] = React.useState(false);
  const { value, onChange } = field;

  const selectedItem = items.find((item) => itemValueExtractor(item) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || isSubmitting}
        >
          {selectedItem ? itemDisplayExtractor(selectedItem) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={onSearchTermChange}
          />
          <CommandList>
            {isLoadingItems ? (
              <div className="p-4 text-center text-sm">{loadingMessage}</div>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={String(itemKeyExtractor(item))}
                      value={String(itemValueExtractor(item))}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === itemValueExtractor(item)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {itemDisplayExtractor(item)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}