#!/usr/bin/env python3
"""
Module defines a class LIFOCache that inherits from BaseCaching and
is a caching system
"""
from typing import Any
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """inherits from BaseCaching and is a LIFO caching system"""

    def __init__(self) -> None:
        """Initialises a LIFOCache object"""
        super().__init__()
        self.age_bit: list[str] = []

    def put(self, key: str, item: Any) -> None:
        """assigns to self.cache_data the item value for the key key"""
        if key and item:
            if len(self.cache_data.keys()) < self.MAX_ITEMS:
                self.cache_data[key] = item
                self.age_bit.append(key)
            else:
                if key in self.cache_data.keys():
                    self.cache_data[key] = item
                    self.age_bit.remove(key)
                    self.age_bit.append(key)
                else:
                    discarded_key = self.age_bit.pop(-1)
                    del self.cache_data[discarded_key]
                    print(f"DISCARD: {discarded_key}")
                    self.cache_data[key] = item
                    self.age_bit.append(key)

    def get(self, key: str) -> Any:
        """returns the value in self.cache_data linked to key"""
        return self.cache_data.get(key)
