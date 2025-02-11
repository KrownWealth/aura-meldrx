"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type TabData = {
  title: "Prediction" | "Classification" | "Recommendation";
  content: string[];
};

interface ReusableTabsProps {
  tabsData: TabData[];
}

const ReusableTabs: React.FC<ReusableTabsProps> = ({ tabsData }) => {
  return (
    <Tabs defaultValue={tabsData[0]?.title} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.title} value={tab.title}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab) => (
        <TabsContent key={tab.title} value={tab.title}>
          <Card>
            <CardHeader>
              <CardTitle>{tab.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {tab.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ReusableTabs;
