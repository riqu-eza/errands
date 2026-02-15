import { IService } from '@/app/models/Service'
import { DollarSign, Zap } from 'lucide-react'

export interface ServiceCardProps {
  service: IService
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { name, description, basePrice, isActive } = service
console.log("Rendering ServiceCard for:", name, { basePrice, isActive })
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
      {/* Header with status badge */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{name}</h3>
        {isActive ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
            <Zap className="w-3 h-3" />
            Active
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
            Inactive
          </span>
        )}
      </div>

      {/* Description with better visual */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
        {description}
      </p>

      {/* Price section with emphasis */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-baseline gap-1">
          {basePrice ? (
            <>
              <span className="text-2xl font-bold text-blue-600">Ksh{basePrice}</span>
              <span className="text-xs text-gray-400 ml-1">/Service</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">Custom pricing</span>
          )}
        </div>
        
        {/* Quick action indicator */}
      </div>
    </div>
  )
}