import { Info, Database, Newspaper, AlertCircle } from "lucide-react";

interface DataSourceInfoProps {
  meta: {
    total_articles: number;
    sources_scanned: string[];
    data_source: string;
    last_updated: string;
  };
}

const DataSourceInfo = ({ meta }: DataSourceInfoProps) => {
  return (
    <div className="bg-darkbg-lighter border border-white/10 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <Database className="h-5 w-5 text-neon-cyan mr-2" />
        <h3 className="text-sm font-medium">Data Source Information</h3>
      </div>
      
      <div className="space-y-2 text-xs text-gray-300">
        <div className="flex items-start">
          <Newspaper className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
          <div>
            <span className="text-gray-400">Articles analyzed:</span> {meta.total_articles} articles from {meta.sources_scanned.length} sources
          </div>
        </div>
        
        <div className="flex items-start">
          <Info className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
          <div>
            <span className="text-gray-400">Sources:</span> {meta.sources_scanned.join(", ")}
          </div>
        </div>
        
        <div className="flex items-start">
          <AlertCircle className="h-4 w-4 text-amber-400 mr-2 mt-0.5" />
          <div>
            <span className="text-gray-400">Note:</span> {meta.data_source}
          </div>
        </div>
        
        <div className="text-right text-gray-500 text-xs italic mt-2">
          Last updated: {meta.last_updated}
        </div>
      </div>
    </div>
  );
};

export default DataSourceInfo; 